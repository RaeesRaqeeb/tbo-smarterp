from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from .db import get_db
from .models import AuditEvent, User
from .security import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    user_id = decode_token(token)
    user = db.get(User, user_id) if user_id else None
    if not user or not user.is_active:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired session",
                            headers={"WWW-Authenticate": "Bearer"})
    return user


def user_permissions(user: User) -> set[str]:
    return {p.code for p in user.role.permissions}


def require_permission(code: str):
    def checker(user: User = Depends(get_current_user)) -> User:
        if code not in user_permissions(user):
            raise HTTPException(status.HTTP_403_FORBIDDEN, f"Missing permission: {code}")
        return user
    return checker


def audit(db: Session, user: User | None, action: str, entity_type: str | None = None,
          entity_id: str | int | None = None, before: dict | None = None, after: dict | None = None,
          request: Request | None = None) -> None:
    db.add(AuditEvent(
        user_id=user.id if user else None, action=action, entity_type=entity_type,
        entity_id=str(entity_id) if entity_id is not None else None,
        before=before, after=after,
        ip_address=request.client.host if request and request.client else None,
    ))
