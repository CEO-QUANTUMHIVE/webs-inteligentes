# Deploy automatico a Cloud Run

El workflow `.github/workflows/deploy-cloud-run.yml` se ejecuta en cada push a
`main` y tambien puede iniciarse manualmente desde GitHub Actions.

## Flujo

1. Compila todas las plantillas Vite encontradas en `plantillas/*`.
2. Compila `clientes/quantum-hive` como export estatico.
3. Verifica las rutas y demos criticas.
4. Autentica GitHub contra Google Cloud mediante Workload Identity Federation.
5. Despliega el contenedor Nginx al servicio `webs-inteligentes`.

## Secrets requeridos en GitHub

| Secret | Contenido |
|--------|-----------|
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publishable de Supabase |

El provider de Workload Identity y la service account no son secretos. Sus
identificadores publicos estan declarados en el workflow.

Ejemplo de provider:

```text
projects/854335368640/locations/global/workloadIdentityPools/github-actions/providers/github
```

Ejemplo de service account:

```text
github-webs-inteligentes@bubbly-stone-502214-u7.iam.gserviceaccount.com
```

No guardar claves JSON de Google Cloud en el repositorio. La identidad federada
ya configurada emite credenciales temporales para cada ejecución.

## Permisos de Google Cloud

La service account de deploy necesita permisos para:

- desplegar Cloud Run;
- ejecutar builds desde source;
- actuar como la service account de runtime;
- usar los servicios del proyecto.

La federacion debe restringirse al repositorio:

```text
CEO-QUANTUMHIVE/webs-inteligentes
```

## Verificacion

En GitHub:

```text
Actions > Deploy Webs Inteligentes
```

La ejecucion debe terminar mostrando la URL del servicio de Cloud Run. El dominio
`websinteligentes.quantumhive.com.ar` sigue apuntando a ese servicio.
