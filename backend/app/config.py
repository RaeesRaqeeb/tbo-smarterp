from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+psycopg://tbo:tbo_dev_password@localhost:5432/tbo_smarterp"
    redis_url: str = "redis://localhost:6379/0"
    secret_key: str = "dev-only-change-me"
    access_token_expire_minutes: int = 480
    cors_origins: str = "http://localhost:3000"
    admin_email: str = "admin@thebrandsoutlet.com"
    admin_password: str = "ChangeMe!123"
    fleek_mode: str = "not_connected"


settings = Settings()
