import jwtDecode from 'jwt-decode';

function saveUserInLocalStorage(tokenDetails: any) {
  localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}
function removeUserInLocalStorage() {
  localStorage.removeItem('userDetails');
}

function updateUserAccessToken(token: string) {
  console.log('accesstoken:', token);

  localStorage.setItem(
    'userDetails',
    JSON.stringify({
      ...JSON.parse(localStorage.getItem('userDetails') as string),
      accessToken: token,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   @ts-ignore
      expiresIn: jwtDecode(token)['expiresIn'],
    })
  );
}

const TokenService = {
  saveUserInLocalStorage,
  removeUserInLocalStorage,
  updateUserAccessToken,
};
export default TokenService;
