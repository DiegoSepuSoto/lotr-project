FROM golang:alpine AS builder
RUN apk --no-cache add build-base git bzr mercurial gcc
ADD . /src
RUN cd /src && go build -o app

FROM alpine
WORKDIR /app
COPY --from=builder /src/app /app/
ENTRYPOINT ./app