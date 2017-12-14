import Route from '@ember/routing/route';

export default Route.extend({

    model() {
      return this.store.findAll('announcement');
    },

    actions: {
      addAnnouncement() {
        let announcement = this.store.createRecord('announcement');
        announcement.set('isEditing', true);
      },

      deleteAnnouncement(announcement) {
        let confirmation = confirm('Are you sure you want to delete this announcement?');

        if (confirmation) {
          announcement.destroyRecord();
        }
      },

      editAnnouncement(announcement) {
        announcement.set('isEditing', true);
      },

      saveAnnouncement(announcement) {
        announcement.set('isEditing', false);
        announcement.save();
      },

      cancelAnnouncementEdit(announcement) {
        announcement.set('isEditing', false);
        announcement.rollbackAttributes();
      }
    }
});
