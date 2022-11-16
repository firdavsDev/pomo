import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { SettingsForm } from './SettingsForm';
import { AppContext } from 'app/AppContext';
import { PomodoroIntervals } from 'types';

export const Settings = () => {
  const { intervals, setIntervals } = useContext(AppContext);

  const [isOpened, setIsOpened] = useState(false);
  const [preferences, setPreferences] = useState(intervals);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setIntervals(preferences);
    setIsOpened(false);
  }, [preferences, setIntervals]);

  const handleChange = useCallback(
    (interval: PomodoroIntervals) => (event: ChangeEvent<HTMLInputElement>) => {
      setPreferences((previousPreferences) => ({
        ...previousPreferences,
        [interval]: event.target.value,
      }));
    },
    []
  );

  return (
    <>
      <Button icon="dots" onClick={handleOpen} variant="secondary" />

      {isOpened && (
        <Modal onClose={handleClose} title="Settings">
          <SettingsForm value={preferences} onChange={handleChange} />
        </Modal>
      )}
    </>
  );
};