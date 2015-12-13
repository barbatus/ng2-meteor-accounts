# Meteor Accounts API for Angular 2.

Accounts services to be used in custom Angular 2 components.

Wraps over API of different Meteor accounts packages, including 'accounts-base', 'accounts-password', 'accounts-facebook' etc.

Additionally, implements some login specific annotations for a convenience of API users.

## API

### AccountsService

Exposes and combines API of the 'accounts-base' and 'accounts-password' packages.

Makes API more compatible with the Angular 2 code style, e.g., by making methods return promises.

**`login(usernameOrEmail: string, password): Promise<any>`**

Simple username/password login.

**`register(newUser: AccountDetails):Promise<any>`**

Registers a new account. `AccountDetails` has a format as follows:

```ts
{
  name: string;
  password: string;
  profile?: Object;
}
```
For more info, please read here.

**`forgotPassword(email: string):Promise<any>`**

Sends out a token to reset current password.

**`resetPassword(token: string, newPassword: string): Promise<any>`**

Sets a new password with the token provided `forgotPassword`.

**`changePassword(oldPassword: string, newPassword: string): Promise<any>`**

Simply change password, given the current password and a new one.

**`verifyEmail(token: string): Promise<any>`**

Verifies a user email, passed in the `register` method during the account registration.

### AccountsSocialService

Social services login.

**`loginWith(provider: string, loginOptions?: LoginOptions): Promise<any>`**

Login with the help of a particular account provider. Among them are Google, Facebook, Twitter, Github, Meteor etc.

To make a particular account provider available, you will need to install a corresponding package, for example:
```
meteor add accounts-facebook
```
if you want to allow logining with Facebook.

Original doc can be found here.

`loginOptions` is used to provide the following info:

```ts
{
  requestPermissions?: Array<string>;
  loginStyle: string;
}
```

### Annotations

`@InjectUser(propName: string)`

Injects Meteor's user as a property to a Angular 2 component or directive.

By default, property called `user` and, if you added `urigo:angular2-meteor`, is reactive.

If you want to change property name, pass in a particular name in the annotation.

`@RequireUser()`

If placed above a component, will prohibit anonymous access to that component.
Only logged-in users (via any ways described above) will be able to load it.

