import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons5 from 'react-icons/io5';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'New Patients',
    path: 'patients/new',
    icon: <IoIcons5.IoPersonAddSharp/>,
    cName: 'nav-text'
  },
  {
    title: 'Onboarding Patients',
    path: 'patients/onboarding',
    icon: <IoIcons5.IoPersonSharp />,
    cName: 'nav-text'
  },
  {
    title: 'OnGoingPatients',
    path: 'patients/live',
    icon: <IoIcons5.IoPersonCircleSharp/>,
    cName: 'nav-text'
  },
  {
    title: 'Deployed Caregivers',
    path: 'caregivers/deployed',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Bench Caregivers',
    path: 'caregivers/bench',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Complaints&Issues',
    path: '/comps',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Followups',
    path: '/followups',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Inventory Requests',
    path: '/invreqs',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Pending Collections',
    path: '/pendingcollections',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Pendig Documents',
    path: '/pendingdocs',
    icon: <IoIcons5.IoDocumentTextSharp />,
    cName: 'nav-text'
  },
  {
    title: 'Closing Services',
    path: '/closingservices',
    icon: <IoIcons5.IoDocumentTextSharp />,
    cName: 'nav-text'
  }
];