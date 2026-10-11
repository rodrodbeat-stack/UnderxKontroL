(() => {
  "use strict";

  const REPO = "rodrodbeat-stack/UnderxKontroL";
  const API = `https://api.github.com/repos/${REPO}`;

  const modules = {
    command: {
      title: "COMMAND CENTER",
      subtitle: "CENTRO DE OPERACIONES",
      description: "Vista general de la plataforma SKYNET."
    },
    cicd: {
      title: "CI/CD OPERATIONS",
      subtitle: "CONTINUOUS DELIVERY",
      description: "Flujo de integración, pruebas, seguridad y despliegue."
    },
    security: {
      title: "DEVSECOPS SECURITY",
      subtitle: "SECURITY OPERATIONS",
      description: "Controles de seguridad y gestión de vulnerabilidades."
    },
    cloud: {
      title: "CLOUD GOVERNANCE",
      subtitle: "MULTICLOUD CONTROL",
      description: "Gobernanza para Azure, AWS y Google Cloud."
    },
    environments: {
      title: "ENVIRONMENTS",
      subtitle: "LIFECYCLE MANAGEMENT",
      description: "Gestión visual del ciclo de vida de los entornos."
    },
    observability: {
      title: "OBSERVABILITY",
      subtitle: "MONITORING CENTER",
      description: "Centro de monitorización y telemetría."
    },
    deploy: {
      title: "DEPLOYMENT CENTER",
      subtitle: "RELEASE CONTROL",
      description: "Ejecuciones y publicaciones del repositorio."
    }
  };

  const stages = [
    "DEVELOP",
    "BUILD",
    "TEST",
    "SECURITY",
    "CERT",
    "QA",
    "PRODUCTION"
  ];

  function createConsole() {
    const root = document.getElementById("skynet-console");
    if (!root) return;

    root.innerHTML = `
      <div class="skynet-shell">

        <header class="sk-header">
          <div class="sk-brand">
            <div class="sk-logo">SK</div>
            <div>
              <h1>SKYNET <span>UnderxKontroL</span></h1>
              <small>888 DIGITAL FACTORY // OPERATIONS</small>
            </div>
          </div>
          <div class="sk-status">
            <span class="sk-pulse"></span>
            SYSTEM ONLINE
          </div>
        </header>

        <div class="sk-layout">

          <aside class="sk-sidebar">
            <div class="sk-side-label">COMMAND MENU</div>

            ${Object.entries(modules).map(([id, m]) => `
              <button class="sk-nav ${id === "command" ? "active" : ""}"
                data-module="${id}">
                <span>${{
                  command: "⌘",
                  cicd: "⇄",
                  security: "⬡",
                  cloud: "☁",
                  environments: "◈",
                  observability: "◎",
                  deploy: "🚀"
                }[id]}</span>
                ${m.title}
              </button>
            `).join("")}

            <div class="sk-sidebar-foot">
              <span class="sk-pulse"></span>
              SECURE CONSOLE
            </div>
          </aside>

          <main class="sk-main">

            <div class="sk-page-heading">
              <div>
                <div class="sk-eyebrow" id="sk-subtitle">
                  CENTRO DE OPERACIONES
                </div>
                <h2 id="sk-title">COMMAND CENTER</h2>
                <p id="sk-description">
                  Vista general de la plataforma SKYNET.
                </p>
              </div>
              <div class="sk-clock" id="sk-clock">--:--:--</div>
            </div>

            <section id="sk-module-content"></section>

            <footer class="sk-footer">
              SKYNET // DEVSECOPS CONTROL PLANE
              <span>GITHUB PAGES</span>
            </footer>

          </main>
        </div>
      </div>
    `;

    root.querySelectorAll("[data-module]").forEach(button => {
      button.addEventListener("click", () => {
        showModule(button.dataset.module);
      });
    });

    showModule("command");
    updateClock();
    setInterval(updateClock, 1000);
  }

  function updateClock() {
    const clock = document.getElementById("sk-clock");
    if (clock) {
      clock.textContent = new Date().toLocaleTimeString("es-CL", {
        hour12: false
      });
    }
  }

  function showModule(id) {
    const module = modules[id];
    if (!module) return;

    document.querySelectorAll("[data-module]").forEach(button => {
      button.classList.toggle("active", button.dataset.module === id);
    });

    document.getElementById("sk-title").textContent = module.title;
    document.getElementById("sk-subtitle").textContent = module.subtitle;
    document.getElementById("sk-description").textContent =
      module.description;

    const content = document.getElementById("sk-module-content");

    const views = {
      command: commandView,
      cicd: cicdView,
      security: securityView,
      cloud: cloudView,
      environments: environmentsView,
      observability: observabilityView,
      deploy: deployView
    };

    content.innerHTML = views[id]();
    bindActions(id);
  }

  function commandView() {
    return `
      <div class="sk-grid sk-grid-3">
        ${metric("01", "CI/CD PIPELINE", "GITHUB ACTIONS", "LIVE")}
        ${metric("02", "SECURITY", "CONTROLES", "DEMO")}
        ${metric("03", "CLOUD", "MULTICLOUD", "DEMO")}
      </div>

      <div class="sk-grid sk-grid-2">
        <article class="sk-panel">
          <div class="sk-panel-title">◉ RADAR DE OPERACIONES</div>
          <div class="sk-radar">
            <div class="sk-radar-ring ring-one"></div>
            <div class="sk-radar-ring ring-two"></div>
            <div class="sk-radar-ring ring-three"></div>
            <div class="sk-radar-cross"></div>
            <div class="sk-radar-sweep"></div>
            <div class="sk-radar-dot dot-one"></div>
            <div class="sk-radar-dot dot-two"></div>
            <div class="sk-radar-center">SK</div>
          </div>
          <div class="sk-note">
            RADAR VISUAL · SIN TELEMETRÍA REAL
          </div>
        </article>

        <article class="sk-panel">
          <div class="sk-panel-title">▣ PIPELINE STATUS</div>
          <div id="sk-latest-runs">Consultando GitHub Actions...</div>
          <button class="sk-button" data-action="refresh">
            ↻ ACTUALIZAR ESTADO
          </button>
          <a class="sk-button sk-link"
            href="https://github.com/${REPO}/actions"
            target="_blank" rel="noopener">
            VER EJECUCIONES ↗
          </a>
        </article>
      </div>

      <article class="sk-panel">
        <div class="sk-panel-title">▰ OPERATIONAL ENVIRONMENTS</div>
        <div class="sk-environments">
          ${environment("INTEGRACIÓN", "INT")}
          ${environment("CERTIFICACIÓN", "CERT")}
          ${environment("QA", "QA")}
          ${environment("PRODUCCIÓN", "PROD")}
        </div>
        <div class="sk-note">
          ENTORNOS REPRESENTADOS VISUALMENTE; NO INDICAN
          EL ESTADO REAL DE INFRAESTRUCTURA.
        </div>
      </article>
    `;
  }

  function cicdView() {
    return `
      <article class="sk-panel">
        <div class="sk-panel-title">⇄ CONTINUOUS INTEGRATION / DELIVERY</div>
        <div class="sk-pipeline">
          ${stages.map((stage, index) => `
            <div class="sk-stage">
              <div class="sk-stage-node">${String(index + 1).padStart(2, "0")}</div>
              <strong>${stage}</strong>
              <small>${index === 0 ? "SOURCE" : "STAGE"}</small>
            </div>
            ${index < stages.length - 1
              ? '<div class="sk-stage-line"></div>' : ""}
          `).join("")}
        </div>
        <p class="sk-note">
          Flujo ilustrativo. El resultado real de cada etapa
          depende de los jobs configurados en GitHub Actions.
        </p>
        <a class="sk-button sk-link"
          href="https://github.com/${REPO}/actions"
          target="_blank" rel="noopener">
          ABRIR PIPELINES REALES ↗
        </a>
      </article>

      <article class="sk-panel">
        <div class="sk-panel-title">ÚLTIMAS EJECUCIONES REALES</div>
        <div id="sk-latest-runs">Consultando GitHub Actions...</div>
        <button class="sk-button" data-action="refresh">
          ↻ ACTUALIZAR
        </button>
      </article>
    `;
  }

  function securityView() {
    return `
      <div class="sk-grid sk-grid-3">
        ${metric("01", "VULNERABILITIES", "PENDIENTE DE CONEXIÓN", "DEMO")}
        ${metric("02", "COMPLIANCE", "CONTROLES", "DEMO")}
        ${metric("03", "POLICY STATUS", "GOBERNANZA", "DEMO")}
      </div>
      <article class="sk-panel">
        <div class="sk-panel-title">⬡ SECURITY OPERATIONS</div>
        <p>Área preparada para integrar resultados de análisis SAST,
        dependencias, secretos, contenedores y configuración cloud.</p>
        <div class="sk-note">
          SIN ESCÁNERES CONECTADOS NO SE PUEDEN CONFIRMAR
          VULNERABILIDADES NI NIVELES DE CUMPLIMIENTO.
        </div>
        <a class="sk-button sk-link"
          href="https://github.com/${REPO}/security"
          target="_blank" rel="noopener">
          REVISAR SEGURIDAD EN GITHUB ↗
        </a>
      </article>
    `;
  }

  function cloudView() {
    return `
      <div class="sk-grid sk-grid-3">
        ${cloudCard("AZURE", "AZ")}
        ${cloudCard("AWS", "AWS")}
        ${cloudCard("GOOGLE CLOUD", "GCP")}
      </div>
      <article class="sk-panel">
        <div class="sk-panel-title">CLOUD GOVERNANCE</div>
        <p>Panel preparado para integrar inventario, políticas,
        cumplimiento, IAM y configuración de recursos.</p>
        <div class="sk-note">
          DATOS CLOUD NO CONECTADOS · ESTADO REAL NO DISPONIBLE.
        </div>
      </article>
    `;
  }

  function environmentsView() {
    return `
      <article class="sk-panel">
        <div class="sk-panel-title">ENVIRONMENT LIFECYCLE</div>
        <div class="sk-environments">
          ${environment("INTEGRACIÓN", "INT")}
          ${environment("CERTIFICACIÓN", "CERT")}
          ${environment("QA", "QA")}
          ${environment("PRODUCCIÓN", "PROD")}
        </div>
        <p class="sk-note">
          Los entornos son representativos. No están conectados
          a infraestructura ni autorizan despliegues.
        </p>
      </article>
    `;
  }

  function observabilityView() {
    return `
      <div class="sk-grid sk-grid-3">
        ${toolCard("GRAFANA", "http://localhost:3000")}
        ${toolCard("PROMETHEUS", "http://localhost:9090")}
        ${toolCard("KIBANA", "http://localhost:5601")}
      </div>
      <article class="sk-panel">
        <div class="sk-panel-title">OBSERVABILITY CENTER</div>
        <p>Los accesos localhost funcionan únicamente si esas
        herramientas están desplegadas y accesibles desde tu dispositivo
        o red. GitHub Pages no aloja estos servicios.</p>
        <div class="sk-note">
          MÉTRICAS, LOGS Y ALERTAS REALES: PENDIENTES DE CONEXIÓN.
        </div>
      </article>
    `;
  }

  function deployView() {
    return `
      <article class="sk-panel">
        <div class="sk-panel-title">DEPLOYMENT CONTROL</div>
        <p>Consulta el historial de publicaciones y ejecuciones.</p>
        <a class="sk-button sk-link"
          href="https://github.com/${REPO}/actions"
          target="_blank" rel="noopener">
          VER GITHUB ACTIONS ↗
        </a>
        <a class="sk-button sk-link"
          href="https://github.com/${REPO}/deployments"
          target="_blank" rel="noopener">
          VER DEPLOYMENTS ↗
        </a>
        <a class="sk-button sk-link"
          href="https://github.com/${REPO}/commits/main"
          target="_blank" rel="noopener">
          VER COMMITS ↗
        </a>
      </article>
      <article class="sk-panel">
        <div class="sk-panel-title">LATEST PIPELINE RUNS</div>
        <div id="sk-latest-runs">Consultando GitHub Actions...</div>
        <button class="sk-button" data-action="refresh">
          ↻ ACTUALIZAR
        </button>
      </article>
    `;
  }

  function metric(number, title, subtitle, badge) {
    return `
      <article class="sk-metric">
        <span class="sk-metric-number">${number}</span>
        <strong>${title}</strong>
        <small>${subtitle}</small>
        <span class="sk-badge">${badge}</span>
      </article>
    `;
  }

  function environment(title, code) {
    return `
      <div class="sk-env-card">
        <span>${code}</span>
        <strong>${title}</strong>
        <small>ESTADO NO CONECTADO</small>
      </div>
    `;
  }

  function cloudCard(title, code) {
    return `
      <article class="sk-metric">
        <span class="sk-metric-number">${code}</span>
        <strong>${title}</strong>
        <small>PROVIDER</small>
        <span class="sk-badge">DEMO</span>
      </article>
    `;
  }

  function toolCard(title, address) {
    return `
      <article class="sk-metric">
        <span class="sk-metric-number">◎</span>
        <strong>${title}</strong>
        <small>ENDPOINT CONFIGURABLE</small>
        <a class="sk-button sk-link"
          href="${address}" target="_blank" rel="noopener">
          ABRIR ↗
        </a>
      </article>
    `;
  }

  function bindActions() {
    document.querySelectorAll('[data-action="refresh"]').forEach(button => {
      button.addEventListener("click", loadRuns);
    });

    loadRuns();
  }

  async function loadRuns() {
    const containers = document.querySelectorAll("#sk-latest-runs");
    if (!containers.length) return;

    containers.forEach(el => {
      el.textContent = "Consultando GitHub Actions...";
    });

    try {
      const response = await fetch(`${API}/actions/runs?per_page=5`);

      if (!response.ok) {
        throw new Error("GitHub API no disponible");
      }

      const data = await response.json();

      const html = data.workflow_runs.length
        ? data.workflow_runs.map(run => {
            const status = run.conclusion ||
              (run.status === "in_progress" ? "EN EJECUCIÓN" : run.status);

            const safeStatus = String(status).replace(/_/g, " ").toUpperCase();

            return `
              <a class="sk-run"
                href="${run.html_url}"
                target="_blank" rel="noopener">
                <span class="sk-run-dot ${run.conclusion === "success" ? "success" : ""}"></span>
                <span>
                  <strong>${escapeHTML(run.name)}</strong>
                  <small>${escapeHTML(run.head_branch)} · ${escapeHTML(safeStatus)}</small>
                </span>
                <span>↗</span>
              </a>
            `;
          }).join("")
        : "<p>No hay ejecuciones disponibles.</p>";

      containers.forEach(el => {
        el.innerHTML = html;
      });
    } catch (error) {
      containers.forEach(el => {
        el.textContent =
          "No se pudo consultar GitHub Actions. Revisa tu conexión.";
      });
    }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  document.addEventListener("DOMContentLoaded", createConsole);
})();
