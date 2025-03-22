
import { useApp } from '@/context/AppContext';
import BusinessHeader from './business/BusinessHeader';
import BusinessSection from './business/BusinessSection';
import SmallBusinessSection from './business/SmallBusinessSection';
import MediumBusinessSection from './business/MediumBusinessSection';
import EnterpriseSection from './business/EnterpriseSection';

const Business = () => {
  const { language } = useApp();

  const handleContact = () => {
    window.location.href = '/contact';
  };

  return (
    <section className="py-24 px-6 bg-white">
      <BusinessHeader 
        title="Apps for businesses of all sizes"
        subtitle="From startups to enterprises, we build custom applications that help your business grow, improve efficiency, and deliver exceptional experiences to your customers."
      />

      {/* Small Businesses Section */}
      <BusinessSection id="small">
        <SmallBusinessSection handleContact={handleContact} />
      </BusinessSection>

      {/* Medium Businesses Section */}
      <BusinessSection id="medium">
        <MediumBusinessSection handleContact={handleContact} />
      </BusinessSection>

      {/* Enterprise Section */}
      <BusinessSection id="enterprise">
        <EnterpriseSection handleContact={handleContact} />
      </BusinessSection>
    </section>
  );
};

export default Business;
