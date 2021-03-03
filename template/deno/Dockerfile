# basically following https://hub.docker.com/r/hayd/deno

FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.8.4 as watchdog
FROM --platform=${TARGETPLATFORM:-linux/amd64} hayd/deno:1.5.2 as ship

ARG TARGETPLATFORM
ARG BUILDPLATFORM

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

RUN chmod 777 /tmp

# DENO part
USER deno
WORKDIR /app
# ADD . /app
COPY index.ts ./

ENV cgi_headers="true"
ENV fprocess="deno run --allow-net index.ts"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

ENV prefix_logs="false"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
