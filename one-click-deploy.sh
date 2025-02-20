# !/src/sh
#!주의) 빌드 도커 배포용 코드 + mac 용이니 실행 하지 마세요.

docker build --platform linux/amd64 -t hbgoguma-project .

docker tag hbgoguma-project mrdos89/hbgoguma-project

# docker에서 push 올림
docker push mrdos89/hbgoguma-project