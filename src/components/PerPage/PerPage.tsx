import './style.css';

interface Props {
  setCountItems: (num: string) => void;
}

export default function PerPage({ setCountItems }: Props) {
  return (
    <select className='count' onChange={(event) => setCountItems(event.target.value)}>
      <option value='20'>20</option>
      <option value='15'>15</option>
      <option value='10'>10</option>
      <option value='5'>5</option>
    </select>
  );
}
