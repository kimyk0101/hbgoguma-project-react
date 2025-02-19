# Base Image
FROM nginx:latest

# 이미지 메타데이터
LABEL maintainer="김도형, 김연경, 곽승환, 한준희"
LABEL description="호박고구마ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ"

# 컨텐츠를 제공 가능하게 복사
COPY . /usr/share/nginx/html

# 외부로 노출할 포트
# -p 옵션
EXPOSE 80

# 컨테이너 시작시 수행할 명령어
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
# ENTRYPOINT + CMD 조합

