import { Button } from '@/components/ui/button';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2.5'>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Button>Click me</Button>
    </div>
  );
};

export default Page;
