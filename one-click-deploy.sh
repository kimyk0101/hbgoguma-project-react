# !/src/sh

# docker에서 push 받아옴
docker push mrdos89/hbgogumaserver:latest
docker push mrdos89/hbgoguma-project:latest

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