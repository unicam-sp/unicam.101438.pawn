export function checkPasswords(pass1, pass2) {
    let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/
    if(pass1 !== pass2) return 'Passwords are different'
    else if( pass1 === '') return 'Field password can\'t be empty'
    else if(pass1.length < 6) return 'Password should be at least 6 chars long'
    else if (!regularExpression.test(pass1)) return 'Password accept letters, numbers and these chars: !@#$%^&*'
    else return true
}