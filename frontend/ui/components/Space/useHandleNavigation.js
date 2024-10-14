import { get } from 'lodash';
import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useStoreEntity } from '../../../../react-vault/index.js';

const getDestination = (navHistory, startPath) => {
  const nextRoute = get(navHistory, [...startPath, 'next']);
  return nextRoute ? getDestination(navHistory, [...startPath, nextRoute]) : startPath;
};

export const useHandleNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useStoreEntity((store) => store.history);
  const match = matchPath('/space/:spaceId', location.pathname);

  console.log(history.getDestination(location.pathname));

  useEffect(() => {
    if (!match) return;

    if (get(history.get(), ['', 'space', match.params.spaceId, 'next'])) {
      const destination = getDestination(history.get(), ['', 'space', match.params.spaceId]).join(
        '/',
      );
      return navigate(destination, { replace: true });
    }

    navigate('./select-blockchain', { relative: 'path', replace: true });
  }, [match]);
};
