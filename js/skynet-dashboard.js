document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("skynet-console");
  if (!root) return;

  root.innerHTML = `
    <section class="skynet-header">
      <div>
        <span class="skynet-label">888 DIGITAL FACTORY</span>
        <h1>SKYNET <span>CYBER BLUE</span></h1>
        <p>DEVSECOPS COMMAND CENTER</p>
      </div>
      <div class="skynet-status">
        <span class="status-light"></span>
        SYSTEM ONLINE
      </div>
    </section>

    <nav class="skynet-nav" aria-label="Navegación del centro de operaciones">
      <button class="active" data-panel="command">COMMAND CENTER</button>
      <button data-panel="cicd">CI/CD OPERATIONS</button>
      <button data-panel="security">SECURITY OPS</button>
      <button data-panel="cloud">CLOUD GOVERNANCE</button>
      <button data-panel="environments">ENVIRONMENTS</button>
      <button data-panel="observability">OBSERVABILITY</button>
      <button data-panel="deploy">DEPLOYMENT CENTER</button>
    </nav>

    <div id="skynet-content"></div>

    <footer class="skynet-footer">
      SKYNET CYBER BLUE // OPERATIONAL CONTROL INTERFACE
    </footer>
  `;

  const content = root.querySelector("#skynet-content");

  const panels = {
    command: `
      <h2>◈ COMMAND CENTER</h2>
      <p class="skynet-subtitle">Vista general de operaciones</p>
      <div class="skynet-grid">
        <article class="skynet-card radar-card">
          <h3>CYBER RADAR</h3>
          <div class="cyber-radar"><div class="radar-sweep"></div><span></span></div>
          <p>Radar visual · Sin sensores externos conectados</p>
        </article>
        <article class="skynet-card">
          <h3>CI/CD STATUS</h3>
          <div class="big-value" id="ci-status">CONSULTANDO</div>
          <p>GitHub Actions</p>
          <a href="https://github.com/rodrodbeat-stack/UnderxKontroL/actions" target="_blank" rel="noopener noreferrer">ABRIR PIPELINES ↗</a>
        </article>
        <article class="skynet-card">
          <h3>SECURITY CENTER</h3>
          <div class="big-value">MONITOR</div>
          <p>Los hallazgos requieren herramientas de análisis conectadas.</p>
        </article>
        <article class="skynet-card">
          <h3>ENVIRONMENTS</h3>
          <div class="environment-list">
            <span>INTEGRACIÓN</span><span>CERTIFICACIÓN</span>
            <span>QA</span><span>PRODUCCIÓN</span>
          </div>
          <p>Entornos definidos · Despliegues por verificar</p>
        </article>
      </div>
      <article class="skynet-card">
        <h3>LIVE PIPELINE FEED</h3>
        <div id="skynet-runs">Consultando ejecuciones públicas...</div>
      </article>
    `,
    cicd: `
      <h2>◈ CI/CD OPERATIONS</h2>
      <p class="skynet-subtitle">Flujo de entrega continua</p>
      <div class="pipeline-flow">
        ${["SOURCE","BUILD","TEST","SECURITY","QA","DEPLOY"].map((stage, i) =>
          `<div class="pipeline-stage"><span>0${i + 1}</span><b>${stage}</b><small>ETAPA DEL PIPELINE</small></div>`
        ).join('<div class="flow-arrow">➜</div>')}
      </div>
      <article class="skynet-card"><h3>EJECUCIONES REALES</h3><div id="skynet-runs">Consultando GitHub Actions...</div></article>
      <a class="skynet-link" href="https://github.com/rodrodbeat-stack/UnderxKontroL/actions" target="_blank" rel="noopener noreferrer">ABRIR GITHUB ACTIONS ↗</a>
    `,
    security: `
      <h2>◈ SECURITY OPERATIONS</h2>
      <p class="skynet-subtitle">Centro de controles de seguridad</p>
      <div class="skynet-grid">
        <article class="skynet-card"><h3>SAST</h3><div class="big-value">PENDIENTE</div><p>Conectar analizador estático.</p></article>
        <article class="skynet-card"><h3>DEPENDENCIES</h3><div class="big-value">PENDIENTE</div><p>Conectar análisis de dependencias.</p></article>
        <article class="skynet-card"><h3>VULNERABILITIES</h3><div class="big-value">SIN DATOS</div><p>No hay resultados de escaneo conectados.</p></article>
      </div>
    `,
    cloud: `
      <h2>◈ CLOUD GOVERNANCE</h2>
      <p class="skynet-subtitle">Gobernanza y postura cloud</p>
      <div class="skynet-grid">
        <article class="skynet-card"><h3>ASSET INVENTORY</h3><div class="big-value">SIN CONECTAR</div><p>Conectar proveedor cloud para inventario real.</p></article>
        <article class="skynet-card"><h3>COMPLIANCE</h3><div class="big-value">SIN DATOS</div><p>Controles pendientes de integración.</p></article>
        <article class="skynet-card"><h3>RISK CONTROL</h3><div class="big-value">EN ESPERA</div><p>No se muestran riesgos inventados.</p></article>
      </div>
    `,
    environments: `
      <h2>◈ ENVIRONMENT CONTROL</h2>
      <p class="skynet-subtitle">Ruta de promoción entre entornos</p>
      <div class="environment-flow">
        ${["INTEGRACIÓN","CERTIFICACIÓN","QA","PRODUCCIÓN"].map((env, i) =>
          `<article class="skynet-card"><span>ENV 0${i + 1}</span><h3>${env}</h3><p>${i === 3 ? "Requiere aprobación" : "Promoción pendiente de configurar"}</p></article>`
        ).join('<div class="flow-arrow">➜</div>')}
      </div>
      <p class="skynet-note">Esta vista es informativa. Los controles de aprobación deben configurarse en GitHub Actions.</p>
    `,
    observability: `
      <h2>◈ OBSERVABILITY</h2>
      <p class="skynet-subtitle">Monitorización y telemetría</p>
      <div class="skynet-grid">
        <article class="skynet-card"><h3>METRICS</h3><div class="big-value">SIN CONECTAR</div><p>Integración con Prometheus pendiente.</p></article>
        <article class="skynet-card"><h3>LOGS</h3><div class="big-value">SIN CONECTAR</div><p>Integración con un sistema de logs pendiente.</p></article>
        <article class="skynet-card"><h3>ALERTS</h3><div class="big-value">SIN CONECTAR</div><p>Las alertas reales requieren una fuente de eventos.</p></article>
      </div>
    `,
    deploy: `
      <h2>◈ DEPLOYMENT CENTER</h2>
      <p class="skynet-subtitle">Historial y seguimiento de publicaciones</p>
      <article class="skynet-card"><h3>GITHUB PAGES</h3><p>Consulta el historial real de ejecuciones de despliegue.</p>
        <a href="https://github.com/rodrodbeat-stack/UnderxKontroL/actions" target="_blank" rel="noopener noreferrer">VER HISTORIAL ↗</a>
      </article>
    `
  };

  function showPanel(name) {
    content.innerHTML = panels[name] || panels.command;

    root.querySelectorAll(".skynet-nav button").forEach(button => {
      button.classList.toggle("active", button.dataset.panel === name);
    });

    loadRuns();
  }

  async function loadRuns() {
    const targets = content.querySelectorAll("#skynet-runs");
    if (!targets.length) return;

    try {
      const response = await fetch(
        "https://api.github.com/repos/rodrodbeat-stack/UnderxKontroL/actions/runs?per_page=5",
        { headers: { Accept: "application/vnd.github+json" } }
      );

      if (!response.ok) throw new Error("GitHub API HTTP " + response.status);

      const data = await response.json();

      const html = data.workflow_runs.map(run => {
        const successful = run.status === "completed" && run.conclusion === "success";
        const icon = run.status !== "completed" ? "◷" : successful ? "●" : "!";
        const result = run.status !== "completed" ? run.status : run.conclusion || "unknown";

        return `<div class="run-row">
          <span class="${successful ? "run-ok" : "run-other"}">${icon}</span>
          <div><b>${escapeHTML(run.name)}</b>
          <small>${escapeHTML(run.head_branch || "—")} · ${escapeHTML(result)}</small></div>
          <a href="${run.html_url}" target="_blank" rel="noopener noreferrer">VER ↗</a>
        </div>`;
      }).join("") || "<p>No hay ejecuciones disponibles.</p>";

      targets.forEach(target => target.innerHTML = html);

      const status = document.getElementById("ci-status");
      if (status && data.workflow_runs.length) {
        const latest = data.workflow_runs[0];
        status.textContent = latest.status === "completed"
          ? (latest.conclusion || "UNKNOWN").toUpperCase()
          : latest.status.toUpperCase();
      }
    } catch (error) {
      targets.forEach(target => {
        target.textContent = "No fue posible consultar GitHub Actions. Intenta nuevamente.";
      });
    }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  root.querySelectorAll(".skynet-nav button").forEach(button => {
    button.addEventListener("click", () => showPanel(button.dataset.panel));
  });

  showPanel("command");
  setInterval(loadRuns, 60000);
});
