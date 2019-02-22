<template>
  <v-card>
    <v-card-title class="display-1">
      Planned Maintenance Tasks
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table class="mt-5"
      :headers="headers"
      :items="tasks"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.dueDate }}</td>
        <td class="text-xs-center">{{ props.item.task}}</td>
        <td class="text-xs-center">{{ props.item.type}}</td>
        <td class="text-xs-center">{{ props.item.status}}</td>
        <td class="text-xs-center">{{ props.item.element}}</td>
        <td class="text-xs-center">{{ props.item.subsystem}}</td>
        <td class="text-xs-center">{{ props.item.lastOverhault}}</td>
        <td class="text-xs-center">{{ props.item.runningHours}}</td>
        <td class="text-xs-center">{{ props.item.interval}}</td>
        <td class="text-xs-center">{{ props.item.remainingHours}}</td>
        <td class="text-xs-center">{{ props.item.comment}}</td>
        <td class="text-xs-center">{{ props.item.resourcesPersons}}</td>
        <td class="text-xs-center">{{ props.item.tools}}</td>
        <td class="text-xs-center">{{ props.item.manual}}</td>
        <!--<td class="text-xs-center">{{ props.item.video}}</td>-->
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
    export default {
      name: "PlannedMaintenanceTasks",
      data: function() {
        return {
          search: '',
          headers: [
            {
              text: 'Due Date',
              align: 'left',
              sortable: false,
              dueDate: 'name'
            },
            {text: 'Name',                value: 'task'},
            {text: 'Type',                value: 'type'},
            {text: 'Status',              value: 'status'},
            {text: 'Element',             value: 'element'},
            {text: 'Subsystem',           value: 'subsystem'},
            {text: 'Last Overhaul',       value: 'lastOverhault'},
            {text: 'Running Hours',       value: 'runningHours'},
            {text: 'Interval',            value: 'interval'},
            {text: 'Remaining Hours',     value: 'remainingHours'},
            {text: 'Comment',             value: 'comment'},
            {text: 'Resources (persons)', value: 'resourcesPersons'},
            {text: 'Tools',               value: 'tools'},
            {text: 'Manual',              value: 'manual'},
            // {text: 'Video',               value: 'video'},
          ],
          tasks: [
            {
              dueDate:  '2019/02/14',
              task: 'Exhaust Valve − Removal and Installation',
              status: 'Pending',
              type: 'Overhaul',
              element: 'Cylinder 4',
              subsystem: 24,
              lastOverhault: 4.0,
              runningHours: 2,
              interval: '-',
              remainingHours: '-',
              comment: 'fdfdfd vbnvb',
              resourcesPersons: '-',
              tools: 65,
              manual: 3,
              // video: '-'
              },
            {
              dueDate:  '2019/02/12',
              task: 'Exhaust Valve Control ',
              status: 'Completed',
              type:'Overhaul',
              element: 'Cylinder 4',
              subsystem: 24,
              lastOverhault: 4.0,
              runningHours: 23,
              interval: '-',
              remainingHours: '-',
              comment: '-',
              resourcesPersons: '-',
              tools: 65,
              manual: 7,
              // video: '-'
            },
          ]
        }
      }
    }
</script>

<style scoped>

</style>
