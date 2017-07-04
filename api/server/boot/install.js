'use strict';
var installed=true;
module.exports = function (app) {
    if (!installed) {
        var Account = app.models.Account;
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        var cb = function (m) {
            console.log(m)
        };

        Account.create([
            {username: 'admin', email: 'admin@contact.com', password: 'admin', firstName: "Super", lastName: "Admin"}
        ], function (err, Accounts) {
            if (err) return cb(err);

            //create the admin role
            Role.create({
                name: 'administrator'
            }, function (err, role) {
                if (err) cb(err);

                //make bob an admin
                role.principals.create({
                    principalType: RoleMapping.Account,
                    principalId: Accounts[0].id
                }, function (err, principal) {
                    cb(err);
                });
            });
        });
    }
};