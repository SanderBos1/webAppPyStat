install:
	venv\Scripts\activate \
	pip install --upgrade pip &&\
	pip install -r requirements.txt

make_vm:
	python -m venv venv

format:
	black *.py

lint:
	pylint --disable=R,C main.py

all: install lint test
