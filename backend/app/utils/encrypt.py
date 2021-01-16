import os

from cryptography.fernet import Fernet


def encrypt_string(str: str) -> str:
    key = os.getenv("FER_KEY")
    if key:
        fernet = Fernet(key.encode())
        return fernet.encrypt(str.encode()).e
    else:
        raise Exception("Cannot read key to encrypt access token")


def decrypt_string(str: str) -> str:
    key = os.getenv("FER_KEY")
    if key:
        fernet = Fernet(key.encode())
        return fernet.decrypt(str).decode('utf-8')
    else:
        raise Exception("Cannot read key to encrypt access token")
