[README.md](https://github.com/user-attachments/files/30489142/README.md)
# TalentSphere

A full-stack skill-verification platform with a production-style DevSecOps pipeline — built to showcase end-to-end delivery from code to a monitored Kubernetes deployment.

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌───────────┐
│   Frontend   │ ───▶ │   Backend    │ ───▶ │   MySQL   │
│ React + Vite │      │ Spring Boot  │      │    8.4    │
└─────────────┘      └──────────────┘      └───────────┘
```

Both services are containerized, deployed to Kubernetes via Helm, and monitored with Prometheus.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router, Axios |
| Backend | Java, Spring Boot, Maven |
| Database | MySQL 8.4 (Kubernetes-managed, PVC-backed) |
| CI/CD | Jenkins (dedicated EC2) |
| Code Quality | SonarQube (dedicated EC2) |
| Security Scanning | Trivy (filesystem + image) |
| Artifact Repository | Nexus (dedicated EC2) |
| Container Registry | Docker Hub |
| Orchestration | AWS EKS, Helm, NGINX Ingress |
| Autoscaling | Horizontal Pod Autoscaler (CPU-based) |
| Storage | PersistentVolumeClaim (EBS CSI driver) |
| Monitoring | Prometheus + Grafana (custom dashboard: pod counts, CPU/memory gauges, restarts, network) |

## Infrastructure

Jenkins, SonarQube, and Nexus each run on dedicated AWS EC2 instances (infra defined in a companion `TalentSphere-Infra` repo). The application itself runs on AWS EKS, fronted by a single NGINX Ingress controller routing `/` to the frontend and `/api` to the backend — avoiding the cost of multiple LoadBalancers.

## CI/CD Pipeline

The Jenkins pipeline (`Jenkinsfile`) runs the following stages on every commit:

1. **Build Backend** — Maven package
2. **SonarQube Scan** — static code analysis
3. **Trivy FS Scan** — filesystem vulnerability scan
4. **Build Frontend** — npm install + Vite build
5. **Upload Artifact to Nexus** — versioned Maven artifact
6. **Docker Build** — backend and frontend images
7. **Trivy Image Scan** — container vulnerability scan on both images
8. **Push to Docker Hub** — tagged with `${BUILD_NUMBER}` for full traceability
9. **Deploy to EKS** — `kubectl set image` updates the running deployments with the new build tag, triggering a rolling update; on failure, the pipeline automatically runs `kubectl rollout undo`

A GitHub webhook triggers this pipeline automatically on every push — no manual deployment step required.

## Repository Structure

```
.
├── backend/            # Spring Boot REST API
├── frontend/            # React SPA
├── k8s/                  # Kubernetes manifests: backend, frontend, mysql, ingress
├── helm/talentsphere/    # Helm chart for templated deployment
├── monitoring/           # Prometheus alerts and ServiceMonitor for Grafana dashboards
├── Jenkinsfile
└── docker-compose.yml    # Local development stack
```

## Running Locally

```bash
docker-compose up --build
```

This starts MySQL, the Spring Boot backend (`:8080`), and the React frontend (`:3000`).

## Deploying to Kubernetes

```bash
helm install talentsphere ./helm/talentsphere
```

Or apply raw manifests directly:

```bash
kubectl apply -f k8s/
```

Prometheus alert rules and a ServiceMonitor are included under `monitoring/` for observability once deployed.

## Author

**Zaid Aftab** — DevOps Engineer
[GitHub](https://github.com/Zaid1110) · [LinkedIn](https://linkedin.com/in/zaidaftab)
