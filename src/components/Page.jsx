import clsx from 'clsx';

const Page = ({ children, className = "" }) => {
  return <div className={clsx('h-full', className)}>{children}</div>;
};

export default Page;
