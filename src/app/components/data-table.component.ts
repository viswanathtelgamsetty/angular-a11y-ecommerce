import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Employee {
  id: number;
  name: string;
  department: string;
  score: number;
  status: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests table structure semantics (WCAG 1.3.1), table captions, column/row header scopes, and sortable column state (\`aria-sort\`).
      </p>

      @if (isAccessible()) {
        <!-- ACCESSIBLE TABLE -->
        <div class="table-responsive">
          <table class="data-table">
            <caption class="table-caption">
              Employee Performance Metrics (Sorted by {{ sortKey() }} {{ sortDirection() }})
            </caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col" [attr.aria-sort]="sortKey() === 'name' ? sortDirection() : 'none'">
                  <button
                    type="button"
                    class="th-sort-btn"
                    [attr.aria-label]="'Sort by Employee Name, currently ' + (sortKey() === 'name' ? sortDirection() : 'unsorted')"
                    (click)="handleSort('name')"
                  >
                    Employee Name
                    <span aria-hidden="true" class="sort-icon">
                      {{ sortKey() === 'name' ? (sortDirection() === 'ascending' ? ' ▲' : ' ▼') : ' ↕' }}
                    </span>
                  </button>
                </th>
                <th scope="col">Department</th>
                <th scope="col" [attr.aria-sort]="sortKey() === 'score' ? sortDirection() : 'none'">
                  <button
                    type="button"
                    class="th-sort-btn"
                    [attr.aria-label]="'Sort by Performance Score, currently ' + (sortKey() === 'score' ? sortDirection() : 'unsorted')"
                    (click)="handleSort('score')"
                  >
                    Score
                    <span aria-hidden="true" class="sort-icon">
                      {{ sortKey() === 'score' ? (sortDirection() === 'ascending' ? ' ▲' : ' ▼') : ' ↕' }}
                    </span>
                  </button>
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              @for (row of sortedData(); track row.id) {
                <tr>
                  <td>#{{ row.id }}</td>
                  <th scope="row" class="row-header">{{ row.name }}</th>
                  <td>{{ row.department }}</td>
                  <td>{{ row.score }}%</td>
                  <td>
                    <span class="badge" [class]="row.status === 'Active' ? 'badge-success' : 'badge-warning'">
                      {{ row.status }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <!-- INACCESSIBLE TABLE (DIVS) -->
        <div class="fake-table">
          <div class="fake-table-title">Employee Performance Metrics</div>
          <div class="fake-table-header">
            <div class="fake-cell" style="width: 60px;">ID</div>
            <div
              class="fake-cell"
              style="flex: 1; cursor: pointer; font-weight: bold;"
              (click)="handleSort('name')"
            >
              Employee Name {{ sortKey() === 'name' ? (sortDirection() === 'ascending' ? '▲' : '▼') : '' }}
            </div>
            <div class="fake-cell" style="flex: 1;">Department</div>
            <div
              class="fake-cell"
              style="width: 80px; cursor: pointer; font-weight: bold;"
              (click)="handleSort('score')"
            >
              Score {{ sortKey() === 'score' ? (sortDirection() === 'ascending' ? '▲' : '▼') : '' }}
            </div>
            <div class="fake-cell" style="width: 80px;">Status</div>
          </div>
          @for (row of sortedData(); track row.id) {
            <div class="fake-table-row">
              <div class="fake-cell" style="width: 60px;">#{{ row.id }}</div>
              <div class="fake-cell" style="flex: 1;">{{ row.name }}</div>
              <div class="fake-cell" style="flex: 1;">{{ row.department }}</div>
              <div class="fake-cell" style="width: 80px;">{{ row.score }}%</div>
              <div class="fake-cell" style="width: 80px;">{{ row.status }}</div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class DataTableComponent {
  isAccessible = input<boolean>(false);

  rawData: Employee[] = [
    { id: 101, name: 'Alice Walker', department: 'Engineering', score: 98, status: 'Active' },
    { id: 102, name: 'Carlos Mendez', department: 'Design', score: 85, status: 'Active' },
    { id: 103, name: 'Beatrice Vance', department: 'Product', score: 92, status: 'Pending' },
    { id: 104, name: 'David Kim', department: 'Security', score: 78, status: 'Active' },
  ];

  sortKey = signal<keyof Employee>('name');
  sortDirection = signal<'ascending' | 'descending'>('ascending');

  sortedData = computed(() => {
    const key = this.sortKey();
    const dir = this.sortDirection();
    return [...this.rawData].sort((a, b) => {
      if (a[key] < b[key]) return dir === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return dir === 'ascending' ? 1 : -1;
      return 0;
    });
  });

  handleSort(key: keyof Employee) {
    if (this.sortKey() === key) {
      this.sortDirection.update(d => (d === 'ascending' ? 'descending' : 'ascending'));
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('ascending');
    }
  }
}
