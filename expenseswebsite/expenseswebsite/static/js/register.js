const usernameField = document.querySelector('#usernameField')
const feedbackArea = document.querySelector('.invalid-feedback')
const emailField = document.querySelector('#emailField')
const emailFeedback = document.querySelector('.invalid-email')
const passwordField = document.querySelector('#passwordField')
const showPasswordToggle = document.querySelector('.showPasswordToggle')
const submitBtn = document.querySelector('.submit-btn')

const handleToggleInput = () => {
  if (showPasswordToggle.textContent === 'SHOW') {
    showPasswordToggle.textContent = 'HIDE'
    passwordField.setAttribute('type', 'text')
  } else {
    showPasswordToggle.textContent = 'SHOW'
    passwordField.setAttribute('type', 'password')
  }
}
showPasswordToggle.addEventListener('click', handleToggleInput)

usernameField.addEventListener('keyup', (e) => {
  const usernameVal = e.target.value
  console.log(usernameVal)
  if (usernameVal.length > 0) {
    fetch('/authentication/validate-username', {
      body: JSON.stringify({ username: usernameVal }),
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username_error) {
          submitBtn.disabled = true
          usernameField.classList.add('is-invalid')
          feedbackArea.style.display = 'block'
          feedbackArea.innerHTML = `<p>${data.username_error}</p>`
        } else {
          submitBtn.removeAttribute('disabled')
          usernameField.classList.remove('is-invalid')
          feedbackArea.style.display = 'none'
        }
      })
  }
})
emailField.addEventListener('keyup', (e) => {
  const emailVal = e.target.value
  console.log(emailVal)
  if (emailVal.length > 0) {
    fetch('/authentication/validate-email', {
      body: JSON.stringify({ email: emailVal }),
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email_error) {
          submitBtn.disabled=true
          emailField.classList.add('is-invalid')
          emailFeedback.style.display = 'block'
          emailFeedback.innerHTML = `<p>${data.email_error}</p>`
        } else {
          submitBtn.removeAttribute('disabled')
          emailField.classList.remove('is-invalid')
          emailFeedback.style.display = 'none'
        }
      })
  }
})

showPasswordToggle.addEventListener('click', handleToggleInput)
