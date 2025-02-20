# !/src/sh
#!주의) 빌드 도커 배포용 코드 + mac 용이니 실행 하지 마세요.

docker build --platform linux/amd64 -t hbgoguma-project .

docker tag hbgoguma-project mrdos89/hbgoguma-project

# docker에서 push 올림
docker push mrdos89/hbgoguma-project

# compose 폴더에서 .env에 맞춰 docker compose 실행
cd compose
docker compose --env-file .env up -d
cd ..

# 필요한 패키지 설치
npm install react-icons
npm install react-router-dom
npm install axios
npm install react-dom

# 프론트엔드 실행
npm install && npm run dev