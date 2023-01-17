# basically following https://hub.docker.com/r/hayd/deno

FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.8.4 as watchdog
FROM --platform=${TARGETPLATFORM:-linux/amd64} denoland/deno as ship

ARG TARGETPLATFORM
ARG BUILDPLATFORM

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

RUN chmod 777 /tmp

USER deno
WORKDIR /home/app
COPY deps.ts ./
COPY mod.ts ./

USER root
RUN mkdir /home/app/function
USER deno
WORKDIR /home/app/function
COPY function/ ./

WORKDIR /home/app

ENV cgi_headers="true"
ENV fprocess="deno run --allow-net --allow-read mod.ts"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

ENV prefix_logs="false"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
