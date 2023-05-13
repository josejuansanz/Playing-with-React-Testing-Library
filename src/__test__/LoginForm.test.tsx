import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import LoginForm from '../pages/Login/LoginForm';
import { LoginFormMock, LoginFormMockError } from '../__mocks__/LoginForm.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('../pages/Login/components/DisplayFormValues.tsx', () => ({
    __esModule: true,
    default: () => <div>Mocked DisplayFormValues</div>
}));

describe('LoginForm', () => {
  afterEach(cleanup);
  afterEach(jest.clearAllMocks);

  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ data: LoginFormMock });
    render(<LoginForm />);
  });

  it('should check two inputs and a submit button exist', () => {
    const usernameInput = screen.getByRole('textbox', { name: /User name/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });
    const submitButton = screen.getByRole('button', { name: /Log In/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button if the form values are valid', async () => {
    const usernameInput = screen.getByRole('textbox', { name: /User name/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });
    const submitButton = screen.getByRole('button', { name: /Log In/i });

    await userEvent.type(usernameInput, LoginFormMock.username);
    await userEvent.type(passwordInput, LoginFormMock.password);

    // TODO: Do we need this waitFor, or with the previous await is enough?
    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFormMock.username);
      expect(passwordInput).toHaveValue(LoginFormMock.password);
    });

    expect(submitButton).toBeEnabled();
  });

  it('should disable the submit button if the form values are invalid', async () => {
    const usernameInput = screen.getByRole('textbox', { name: /User name/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });
    const submitButton = screen.getByRole('button', { name: /Log In/i });

    await userEvent.type(usernameInput, LoginFormMockError.username);
    await userEvent.type(passwordInput, LoginFormMockError.password);

    // TODO: Do we need this waitFor, or with the previous await is enough?
    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFormMockError.username);
      expect(passwordInput).toHaveValue(LoginFormMockError.password);
    });

    expect(submitButton).toBeDisabled();
    expect(
      screen.getByText(/Username can not be longer than 12 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Password has to include at least an uppercase letter, a lowercase letter, a number and a special character/i
      )
    ).toBeInTheDocument();
  });

  it('should call the onSubmit function when the submit button is clicked', async () => {
    const usernameInput = screen.getByRole('textbox', { name: /User name/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });
    const submitButton = screen.getByRole('button', { name: /Log In/i });

    await userEvent.type(usernameInput, LoginFormMock.username);
    await userEvent.type(passwordInput, LoginFormMock.password);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  it('should mock DisplayFormValues', () => {
    expect(screen.getByText('Mocked DisplayFormValues')).toBeInTheDocument();
  })
});
