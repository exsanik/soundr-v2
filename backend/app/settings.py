import logging


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

file_handler = logging.FileHandler('foo.log')
stream_handler = logging.StreamHandler()

stream_formatter = logging.Formatter(
    '%(asctime)-15s %(levelname)-8s %(message)s')
file_formatter = logging.Formatter(
    "{'time':'%(asctime)s', 'name': '%(name)s', \
    'level': '%(levelname)s', 'message': '%(message)s'}"
)

file_handler.setFormatter(file_formatter)
stream_handler.setFormatter(stream_formatter)

logger.addHandler(file_handler)
logger.addHandler(stream_handler)
