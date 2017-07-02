'use strict';
var installed=true;
module.exports = function (app) {
    if (!installed) {
        var User = app.models.User;
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        var cb = function (m) {
            console.log(m)
        };

        User.create([
            {username: 'admin', email: 'admin@contact.com', password: 'admin'}
        ], function (err, users) {
            if (err) return cb(err);

            //create the admin role
            Role.create({
                name: 'administrator'
            }, function (err, role) {
                if (err) cb(err);

                //make bob an admin
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: users[0].id
                }, function (err, principal) {
                    cb(err);
                });
            });
        });
    }
};