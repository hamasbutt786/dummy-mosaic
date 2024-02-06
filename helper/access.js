export default function ({ accessRoles, userRole }) {
    let found = false;
    accessRoles.forEach((_access) => {
        if (userRole === _access) {
            found = true;
        }
    });
    return found;
}