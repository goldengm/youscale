
export async function logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    window.location.href = '/login'
}