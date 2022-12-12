rm -r ./battery/__pycache__
rm -r ./consumer/__pycache__
rm -r ./producer/__pycache__
rm -r ./user/__pycache__
rm -r ./electroswap/__pycache__
rm -r ./battery/migrations
rm -r ./consumer/migrations
rm -r ./producer/migrations
rm -r ./user/migrations
python3 manage.py flush
python3 manage.py sqlflush
python3 manage.py migrate user zero
python3 manage.py migrate consumer zero
python3 manage.py migrate producer zero
python3 manage.py migrate battery zero
python3 manage.py makemigrations user
python3 manage.py makemigrations consumer
python3 manage.py makemigrations producer
python3 manage.py makemigrations battery
python3 manage.py migrate
