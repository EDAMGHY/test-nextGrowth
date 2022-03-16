// all elements of the DOM that we need
// Buttons
const ajouterModal = document.getElementById('ajouterModal');
const removeModal = document.getElementById('removeModal');
const addBtn = document.getElementById('btnUtil');
// Modals;
const modal = document.querySelector('.modal');
const notification = document.querySelector('.notification');
// table body
const tbody = document.querySelector('tbody');
// No Data <h1> tag
const nodata = document.querySelector('.nodata');
// fields
const nom = document.getElementById('nom'),
  prenom = document.getElementById('prenom'),
  date = document.getElementById('date'),
  utilisateur = document.getElementById('utilisateur'),
  matricule = document.getElementById('matricule'),
  etat = document.getElementById('etat');

//   Add Modal
ajouterModal.addEventListener('click', () => {
  modal.classList.add('show');
});
// remove Modal
removeModal.addEventListener('click', () => {
  modal.classList.remove('show');
});

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  //   init a an ID with random() method
  const id = Math.floor(Math.random() * 1000000).toString();
  //   build a user object
  const user = {
    id,
    firstName: nom.value,
    lastName: prenom.value,
    createdDate: date.value,
    status: etat.value,
    userName: utilisateur.value,
    registrationNumber: matricule.value,
  };
  //   check if input fields is empty
  if (
    nom.value === '' ||
    prenom.value === '' ||
    date.value === '' ||
    etat.value === '' ||
    utilisateur.value === '' ||
    matricule.value === ''
  ) {
    alert('Please Fill All Fields!');
  } else {
    //   add new user to users array
    users.push(user);
    // remove modal
    modal.classList.remove('show');
    //    notification of user added
    notificationModal('User Added!');
    // show new all users with the new ones
    allUsers(users);
    // empty all input fields
    nom.value = '';
    prenom.value = '';
    date.value = '';
    etat.value = '';
    utilisateur.value = '';
    matricule.value = '';
  }
});

// get all users in the DOM
const allUsers = (usersArr) => {
  // truncate the tbody element or we would have users repetition
  tbody.innerHTML = '';
  //   check if users array is empty
  if (usersArr.length === 0) {
    nodata.style.display = 'block';
  } else {
    nodata.style.display = 'none';
    usersArr.forEach((user, index) => {
      const tr = document.createElement('tr');
      // format a date to Month/Day/Year
      let formatDate = new Date(user.createdDate).toLocaleDateString('en-GB');
      // check etat variable for badge color
      let etats =
        user.status === 'Validé'
          ? 'valide'
          : user.status === 'Rejeté'
          ? 'rejected'
          : 'on-validation';
      // add user to <tr> and <td>
      tr.innerHTML = `
    <td>${user.id}</td>
    <td>${formatDate}</td>
    <td>
    <span class='${`etat ${etats}`}' >
    ${user.status}
    </span>
    </td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.userName}</td>
    <td>${user.registrationNumber}</td>
    <td><i onclick="removeUser(${index})" class="fas fa-trash"></i></td>
    `;
      // add all users <tr> to tbody element
      tbody.appendChild(tr);
    });
  }
};

// all users function
allUsers(users);

// remove User function
const removeUser = (index) => {
  users.splice(index, 1);
  notificationModal('User Deleted!');
  allUsers(users);
};

// notification modal function
const notificationModal = (text) => {
  notification.innerText = text;
  notification.classList.add('show-notification');
  setTimeout(() => {
    notification.classList.remove('show-notification');
  }, 1500);
};
