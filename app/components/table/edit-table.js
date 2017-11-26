import Ember from 'ember';

// This component requires a configuration object in order to render and proccess the model dynamically.
// The configuration object should be passed in as 'modelStructure' and should be an array with a JS object
// for each column.  The column objects should at least have a 'propertyName' related to the name of the model
// propety you want to display.  You can also provide 'displayName' to override the column header.  There are
// several other optional items you can provide as well. here's an example:
//     modelStructure: [
//       {
//         "propertyName": "name",
//         "displayName": "Name",
//         "propertyType": "string",
//         "columnWidth": "30%"
//       },
//       {
//         "propertyName": "startDate",
//         "displayName": "Start Date",
//         "propertyType": "date",
//         "propertyFormat": "ll" //using moment.js short-hand
//       }

export default Ember.Component.extend({
  store: Ember.inject.service(),
  dataTable: null,
  dataTableAddID: "",
  hasSiblingDataTableAddID: false,

  //ACTIONS
  actions: {
    addItem() {
      let item = this.get('store').createRecord(this.get('model').modelName);
          item.set('systemLoadDate', new Date());
      this.send('_setEditing', item);
    },
    editItem(item) {
      //remove existing element from datatable
      this.get('dataTable').row(Ember.$('#' + item.id)).remove();
      this.send('_setEditing', item);
    },
    saveItem(item) {
      //need to clean up input before saving
      let modelStructure = this.get('modelStructure');
      let modelObject;

      for (let i = 0; i < modelStructure.length; i++ ) {
        modelObject = modelStructure[i];

        if(modelObject.propertyType && modelObject.propertyType === "date") {
          item.set(modelObject.propertyName, new Date(item.get(modelObject.propertyName)));
        }
      }

      //need to add defaults if any
      let modelDefaults = this.get('modelDefaults');

      for (let i = 0; i < modelDefaults.length; i++ ) {
        modelObject = modelDefaults[i];

        item.set(modelObject.propertyName, modelObject.propertyValue);
      }

      //save
      item.save(); //TODO error handling
      this.send('_removeEditing', item);
    },
    cancelEditItem(item) {
      item.rollbackAttributes();
      this.send('_removeEditing', item);
    },
    deleteItem(item) {
      let confirmation = confirm('Are you sure you want to delete this?');

      if (confirmation) {
        //delete from store
        item.destroyRecord(); //TODO error handling

        //delete from DataTable
        this.get('dataTable').row(Ember.$('#' + item.id)).remove().draw();
      }
    },

    //COMMON ACTION LOGIC
    _setEditing(item) {
      // set editing=true (this will add a <tr> to the dom)
      item.set('isEditing', true);
      //set id - this will be used to add the new row to the datatable
      //after the dom is updated (using 'didUpdate()' hook)
      this.set('dataTableAddID', item.id);
      this.set('hasSiblingDataTableAddID', true); //if <tr> has a sibling, use to add to dataTable
    },
    _removeEditing(item) {
      //remove existing editable element from datatable
      this.get('dataTable').row(Ember.$('#' + item.id)).remove();
      //set editing
      item.set('isEditing', false);
      //set id - this will be used to add the new row to the datatable
      //after the dom is updated (using 'didUpdate()' hook)
      this.set('dataTableAddID', item.id);
    }
  },



  //LIFECYCLE HOOKS
  didRender() {
    this._super(...arguments);
    //wait until model is done updating before initializing datatable
    if (!this.get('model').isUpdating && !this.get('dataTable')) {
        this.set('dataTable', Ember.$('#' + this.get("tableId")).DataTable({
          columnDefs: [
             { orderable: false, targets: -1 } //remove sorting from last (delete) column
          ]
        }));
    }

  },
  didUpdate() {
    this._super(...arguments);


    let id = this.get('dataTableAddID');
    if (id) {
      //add new dom element(s) to datatable as needed
      let dataTable = this.get('dataTable')
      dataTable.row.add(Ember.$('#' + id));

      if(this.get('hasSiblingDataTableAddID')) {
        dataTable.row(Ember.$('#' + id)).child(Ember.$('#' + id).next()).show();
      }

      this.set('hasSiblingDataTableAddID', false);
      this.set('dataTableAddID', "");
      dataTable.draw();
    }
  }
});
