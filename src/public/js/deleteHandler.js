btnHandler();

function btnHandler() {
  const delBtn = document.querySelectorAll('.delBtn');

  if (delBtn.length > 0) {
    delBtn.forEach(btn => {
      btn.addEventListener('click', e => {
        if (confirm('Точно надо удалить это объявление?')) {
          const fetchRes = dataTransmitHandler(e.target.dataset.id);
          fetchRes.then(res => {
            if (res.status === 200) {
              window.location.href = 'http://localhost/api/advertisements';
            } else {
              const msgCont = document.querySelector('.delMessageCont');
              msgCont.textContent = '';
              msgCont.textContent = fetchRes.error;
            }
          });
        }
      })
    })
  }
}

async function dataTransmitHandler(id) {
  const delUrl = `http://localhost/api/advertisements/${id}`;
  let success = false;

  await fetch(delUrl, {
    method: 'DELETE',
    
  })
  .then(res => {
    if (res.status === 200) {
      success = {status: res.status};
    } else {
      success = {status: res.status, error: JSON.parse(res.json())};
    }
  })
  .catch(e => {
    success = {status: res.status, error: e};
  })

  return success;
}