export function saveUserInLocalStorage(tokenDetails: any) {
  localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}
export function removeUserInLocalStorage() {
  localStorage.removeItem('userDetails');
}
