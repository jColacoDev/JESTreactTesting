import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it should show 2 inputs and a button', ()=>{
    render(<UserForm />);

    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button')

    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

test('it should call onUserAdd when the form is submitted',()=>{
    const inputValues={name:'jane', email:'jane@jane.com'}
    const mock = jest.fn();
    render(<UserForm onUserAdd={mock} />);

    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    });
    const emailInput = screen.getByRole('textbox', {
        name: /email/i
    });
    
    user.click(nameInput);
    user.keyboard(inputValues.name);
    user.click(emailInput);
    user.keyboard(inputValues.email);

    const button = screen.getByRole('button');
    user.click(button);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(inputValues);
});