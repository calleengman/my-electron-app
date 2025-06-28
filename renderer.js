const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const pingBtn = document.getElementById('ping-btn')
const pingResult = document.getElementById('ping-result')

pingBtn.addEventListener('click', async () => {
  const response = await window.versions.ping()
  pingResult.textContent = response
})
