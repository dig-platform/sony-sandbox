import * as fromAccountRequest from './account-request.reducer';
import { selectAccountRequestState } from './account-request.selectors';

describe('AccountRequest Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAccountRequestState({
      [fromAccountRequest.accountRequestFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
