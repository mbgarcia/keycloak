FROM quay.io/keycloak/keycloak:26.7.5 as builder

WORKDIR /opt/keycloak

COPY --chown=keycloak:keycloak --chmod=644 ./providers/ /opt/keycloak/providers/

COPY --chown=keycloak:keycloak ./scripts/entrypoint.sh /opt/keycloak/entrypoint.sh

COPY --chown=keycloak:keycloak ./scripts/run-me.sh /opt/keycloak/bin/run-me.sh

USER root

RUN chmod +x /opt/keycloak/bin/run-me.sh

RUN chmod +x /opt/keycloak/entrypoint.sh

ENTRYPOINT [ "/opt/keycloak/entrypoint.sh" ]