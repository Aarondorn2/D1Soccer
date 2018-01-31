import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  store: Ember.inject.service(),

    setupController: function() {
      let contract = this.get('store').createRecord('contract', {
              contractName: "liabilityWaiverV1",
              contractDisplayName: "Liability Waiver",
              contractText: "D1 Sports Training (\"D1\") undertakes the responsibility to provide you with expert sports training and other related services (the \"Program\").  By accepting below, you acknowledge and agree to the following: You represent that you are physically fit to participate in the D1 Program and that, prior to participation in the Program, you have consulted a physician regarding any limitations or medical risks that you may have in relation to the Programs and certify that you are free from any such limitations and medical risks.  You further understand and agree that the Program involves physical exertion and strenuous physical activity by you, which entails certain risks and serious bodily injury and/or death may occur.  For example, physical contact with other participants, equipment or surfaces may occur during the Program.  With full knowledge of the risks of serious bodily injury and death, you voluntarily choose to participate in the Program and (i) hereby forever release, covenant not to sue, discharge and waive all liability on behalf of D1, it's employees, executives, agents, affiliates, owners, subsidiaries, partners, sponsors, owners and lessees of the premises, consultants, volunteers and contractors (the \"Releasees\") for any bodily injury of any kind, property damage or death, suffered by you as a result of your participation in the Program, regardless of whether such bodily injury or death was due to negligence of any kind committed by D1 or the Releasees or otherwise, (ii) agree to indemnify and hold harmless D1 and the Releasees from any loss, liability or cost they may incur arising out of or related to your participation in the Program, and (iii) assume full responsibility for any bodily injury, death, or property damage arising out of or related to your participation in the Program.  Notwithstanding your agreement not to sue D1 and the Releasees, you agree that any legal proceedings of any kind, including those related to the enforceability of this waiver, shall take place in Davidson County, Tennessee.",
              contractValidStartDate: new Date(),
              contractValidEndDate: new Date(),
              systemLoadDate: new Date()
            });
      contract.save().then(() => {
        console.log("success!");
      });
    }
});
