import os
import platform
import logging
from datetime import datetime
from enum import Enum
from typing import Optional
from dotenv import dotenv_values


env = dotenv_values(".env")
LOG_NAME = str(env["LOG_NAME"])
LOG_PATH = str(env["LOG_PATH"])
LOG_LEVEL = str(env["LOG_LEVEL"])


class LogType(Enum):
    GLOBAL = 1
    ALTAN_WEBHOOKS = 2


class Logger:
    _log_file_path: Optional[str] = None
    _configured_loggers: dict[LogType, Optional[logging.Logger]] = {
        LogType.GLOBAL: None,
        LogType.ALTAN_WEBHOOKS: None,
    }

    @staticmethod
    def _config_logger(log_name: str, log_path: str, log_type: LogType):
        try:
            if Logger._configured_loggers[log_type]:
                return

            Logger._make_file_path(log_path)
            Logger.update_log_path(log_path, log_name)

            handler = logging.FileHandler(Logger._log_file_path, mode='a')
            formatter = logging.Formatter(
                '%(asctime)s - %(levelname)s - %(message)s',
                datefmt='%Y-%m-%d %H:%M:%S'
            )
            handler.setFormatter(formatter)

            Logger._configured_loggers[log_type] = logging.getLogger(log_name)
            Logger._configured_loggers[log_type].setLevel(LOG_LEVEL)
            Logger._configured_loggers[log_type].addHandler(handler)
        except Exception as e:
            print(f"Error configuring the log file: {str(e)}")

    @staticmethod
    def update_log_path(log_path: str, file_name: str):
        date_today = datetime.now().strftime("%Y%m%d")
        file_name = file_name.replace("DATE", date_today)
        Logger._log_file_path = os.path.join(log_path, file_name)

    @staticmethod
    def _make_file_path(path: str):
        normalized_path = os.path.normpath(path)
        so = platform.system()

        if not so.lower().startswith("win") and ":" in normalized_path:
            _, normalized_path = normalized_path.split(":", 1)

        try:
            os.makedirs(normalized_path, exist_ok=True)
        except OSError as e:
            print(f"Error creating directoy for log file: {e}")

    @staticmethod
    def _log_write(
        content: str,
        level=logging.INFO,
        log_type: LogType = LogType.GLOBAL
    ) -> None:
        log_name, log_path = Logger._get_log_name_and_path(log_type)

        if Logger._configured_loggers[log_type] is None:
            Logger._config_logger(
                log_name=log_name,
                log_path=log_path,
                log_type=log_type
            )
        try:
            Logger._configured_loggers[log_type].log(level, content)
        except (IOError, AttributeError) as e:
            print(f"Error writing to the log file: {e}")

    @staticmethod
    def _get_log_name_and_path(
        log_type: LogType = LogType.GLOBAL
    ) -> tuple[str, str]:
            return LOG_NAME, LOG_PATH

    @staticmethod
    def info(content: str, log_type: LogType = LogType.GLOBAL) -> None:
        Logger._log_write(content, logging.INFO, log_type)

    @staticmethod
    def warning(content: str, log_type: LogType = LogType.GLOBAL) -> None:
        Logger._log_write(content, logging.WARNING, log_type)

    @staticmethod
    def error(content: str, log_type: LogType = LogType.GLOBAL) -> None:
        Logger._log_write(content, logging.ERROR, log_type)

    @staticmethod
    def debug(content: str, log_type: LogType = LogType.GLOBAL) -> None:
        Logger._log_write(content, logging.DEBUG, log_type)

    @staticmethod
    def critical(content: str, log_type: LogType = LogType.GLOBAL) -> None:
        Logger._log_write(content, logging.CRITICAL, log_type)
