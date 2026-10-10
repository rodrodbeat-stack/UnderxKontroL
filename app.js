const stageInfo = {
  CODE: ["Repositorio y cambios", "Commit firmado, revisión por merge request y protección de rama."],
  BUILD: ["Construcción del artefacto", "Dependencias fijadas, build reproducible y artefacto versionado."],
  TEST: ["Calidad automatizada", "Pruebas unitarias e integración; umbral de cobertura y calidad."],
  SECURITY: ["Controles DevSecOps", "SAST, DAST, SCA, análisis de secretos e imagen de contenedor."],
  "INTEGRACIÓN": ["Entorno de integración", "Despliegue automático y pruebas de humo contra servicios integrados."],
  "CERTIFICACIÓN": ["Certificación", "Validación funcional, evidencia de QA y aprobación requerida."],
  QA: ["Quality Assurance", "Pruebas E2E, regresión, performance y aceptación de release."],
  "PRODUCCIÓN": ["Producción", "Aprobación manual, despliegue controlado, smoke test y rollback disponible."]
};
const envInfo = {
  "INTEGRACIÓN":"Deploy automático habilitado · validaciones de integración aprobadas.",
  "CERTIFICACIÓN":"Release candidato validado · pendiente de aprobación formal si aplica.",
  "QA":"Pruebas E2E disponibles · ambiente estable para validación funcional.",
  "PRODUCCIÓN":"Servicio activo · cambios sujetos a aprobación y estrategia de rollback."
};
const toast = document.getElementById('toast');
let toastTimer;
function notify(message) {
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  btn.classList.add('active');
  const key = btn.dataset.section;
  const labels = {overview:'VISIÓN GENERAL',governance:'GOBERNANZA',security:'SEGURIDAD',pipeline:'CI/CD',environments:'INFRAESTRUCTURA',kubernetes:'KUBERNETES',observability:'MONITOREO',reports:'REPORTES',settings:'CONFIGURACIÓN'};
  document.getElementById('section-title').textContent = labels[key] || 'VISIÓN GENERAL';
  if (key === 'kubernetes' || key === 'settings') notify(key === 'kubernetes' ? 'Vista Kubernetes: conecta tu clúster para cargar métricas reales.' : 'Configuración demo: conecta tus proveedores para habilitar ajustes.');
  const target = document.getElementById(key);
  if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
  else if (key === 'overview') window.scrollTo({top:0,behavior:'smooth'});
}));
document.querySelectorAll('.stage').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.stage').forEach(s => s.classList.remove('selected'));
  btn.classList.add('selected');
  const [title, detail] = stageInfo[btn.dataset.stage];
  document.getElementById('stage-detail').innerHTML = `<b>${title.toUpperCase()}</b><span>${detail}</span>`;
}));
document.querySelectorAll('.environment').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.environment').forEach(e => e.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('env-detail').textContent = envInfo[btn.dataset.env];
  notify(`Entorno seleccionado: ${btn.dataset.env}`);
}));
const obs = document.getElementById('observability-content');
const metricMarkup = obs.innerHTML;
document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  if (btn.dataset.metric === 'metrics') obs.innerHTML = metricMarkup;
  if (btn.dataset.metric === 'logs') obs.innerHTML = `<div class="log-list"><div><span>02:48:01 INFO</span> deploy completed</div><div><span>02:48:02 INFO</span> health check passed</div><div>02:48:03 WARN latency above baseline</div><div><span>02:48:04 INFO</span> policy scan passed</div></div>`;
  if (btn.dataset.metric === 'traces') obs.innerHTML = `<div class="trace-list"><div><span>GET /api/health</span><b>24 ms · OK</b></div><div><span>POST /api/login</span><b>81 ms · OK</b></div><div><span>GET /api/catalog</span><b>46 ms · OK</b></div><div><span>DB query</span><b>13 ms · OK</b></div></div>`;
}));
document.getElementById('refresh-pipelines').addEventListener('click', () => {
  const btn = document.getElementById('refresh-pipelines');
  btn.textContent = '✓ Actualizado';
  document.getElementById('pipeline-message').textContent = 'Vista demo actualizada · datos ilustrativos';
  notify('Panel actualizado. Conecta tu CI/CD para obtener datos reales.');
  setTimeout(() => btn.textContent = '↻ Actualizar', 1800);
});
document.getElementById('view-all').addEventListener('click', () => notify('Vista demo: integra GitLab CI o GitHub Actions para consultar todos los pipelines.'));
function updateClock() { document.getElementById('clock').textContent = new Date().toLocaleTimeString('es-CL',{hour12:false,timeZone:'America/Santiago'}) + ' CLT'; }
updateClock(); setInterval(updateClock,1000);
