const GITHUB_API =
  "https://api.github.com/repos/rodrodbeat-stack/UnderxKontroL/actions/runs?per_page=10";

async function loadGitHubActions() {
  const container = document.getElementById("github-actions");

  if (!container) {
    console.error("No se encontró el elemento #github-actions");
    return;
  }

  container.innerHTML = "<p>Conectando con GitHub Actions...</p>";

  try {
    const response = await fetch(GITHUB_API, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API respondió HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.workflow_runs || data.workflow_runs.length === 0) {
      container.innerHTML = "<p>No hay ejecuciones disponibles.</p>";
      return;
    }

    container.innerHTML = data.workflow_runs.map(run => {
      const status = run.status === "completed"
        ? run.conclusion
        : run.status;

      const success = run.conclusion === "success";

      const indicator = run.status !== "completed"
        ? "🟡"
        : success
          ? "🟢"
          : "🔴";

      return `
        <article class="workflow-card">
          <h3>${escapeHTML(run.name)}</h3>
          <p>${indicator} Estado: ${escapeHTML(status || "desconocido")}</p>
          <p>Rama: ${escapeHTML(run.head_branch || "N/A")}</p>
          <p>Evento: ${escapeHTML(run.event || "N/A")}</p>
          <p>Fecha: ${
            run.created_at
              ? new Date(run.created_at).toLocaleString()
              : "N/A"
          }</p>
          <a href="${run.html_url}"
             target="_blank"
             rel="noopener noreferrer">
            Ver ejecución en GitHub
          </a>
        </article>
      `;
    }).join("");

  } catch (error) {
    console.error("Error consultando GitHub Actions:", error);

    container.innerHTML =
      "<p>No se pudieron cargar las ejecuciones. Intenta nuevamente.</p>";
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

document.addEventListener("DOMContentLoaded", () => {
  loadGitHubActions();

  // Actualizar cada 60 segundos.
  setInterval(loadGitHubActions, 60000);
});
