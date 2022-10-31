import { getInvitationLink } from 'api/Invitation';
import { addUser } from 'api/WorkspaceMember';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { link } = query;
  return {
    props: {
      link,
    },
  };
};

interface IHOCProp {
  link?: string;
}

const InviteLinkHandler: React.FC<IHOCProp> = ({ link }) => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const workspace_idx = await getInvitationLink(link as string);
        const userData = {
          workspace_idx,
          role: 1,
        };
        await addUser(userData);
        router.push(`/workspace/${workspace_idx}`);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return <div>해당 워크스페이스로 이동 중입니다..</div>;
};

export default InviteLinkHandler;
