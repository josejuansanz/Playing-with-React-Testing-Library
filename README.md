# Playing with React Testing Library

This is a small React + TypeScript project that contains a basic login form and includes unit testing for this form using Jest + React Testing Library.

Project created based on this youtube video: https://youtu.be/oUn1J1WHo74

### Notes for my future self
- [*React hook form*](https://react-hook-form.com) library used to create the form.
- [*Yup*](https://github.com/jquense/yup) library used to validate the form fields.
- There is an example in *Button.tsx* of how to retrieve the type used by the type attribute of a button: 
```
type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
```
- There is an example in *Button.tsx* of [how to use the children prop with TypeScript](https://blog.logrocket.com/using-react-children-prop-with-typescript/):
```
PropsWithChildren<Props>
```
