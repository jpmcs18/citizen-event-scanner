import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userProfileActions } from '../../state/reducers/user-profile-reducer';

export default function ToasterItem({
  time,
  title,
  content,
  onMouseOver,
  onMouseLeave,
}: {
  time: number;
  title: string;
  content: any;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}) {
  const [messages, setMessages] = useState<string[]>([]);
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (+content.status === 400) {
        Object.keys(content.errors).forEach((key) =>
          setMessages((x) => [...x, ...content.errors[key]])
        );
      } else {
        if (content.message === 'Unauthorized') {
          dispatch(userProfileActions.clearProfile());
        }
        setMessages(() => [content?.toString()]);
      }
    },
    //eslint-disable-next-line
    []
  );

  return (
    <div
      className='toaster-container'
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      <div className='title'>{title}</div>
      <div className='progress' style={{ width: `${100 / time}%` }}></div>
      <div className='content'>
        {messages.map((x, i) => (
          <div key={i}>
            <span style={{ whiteSpace: 'pre-line' }}>{x}</span>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
