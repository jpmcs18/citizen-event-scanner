import User from '../entities/SystemUser';
import ResultContent from './ResultContent';

export default interface LoginResultContent extends ResultContent {
  user: User | undefined;
}
