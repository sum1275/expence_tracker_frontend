import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { BankStatementService } from 'src/app/core/service/bank-statement.service';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-statement-search',
  templateUrl: './statement-search.component.html',
  styleUrls: ['./statement-search.component.css'],
})
export class StatementSearchComponent {
  searchKeyword: string = '';
  selectedAccounts: string[] = [];
  selectedTimeRange: string = '';

  bulkUploadFile!: FormControl;
  roleArray: Array<any> = [];
  bulkUploadError: boolean = false;
  bulkUploadResponse: any = [];
  submitInProgress: boolean = false;
  failure: any;
  success: any;

  currentSort!: string;
  sortOrder!: number;
  usersList!: any;
  noData: boolean = false;
  isError: boolean = false;
  isLoading: boolean = true;
  pageNumbers = Array(100)
    .fill(1)
    .map((x, y) => x + y);
  startPage: number = 0;
  endPage: number = 3;
  currentPage: number = 1;
  query: string = '';
  pagescroll: number = this.currentPage;
  pages: number = 0;
  filteredData: any = null;
  filterForm!: FormGroup;
  noRoles: boolean = false;
  isRolesError: boolean = false;
  isRolesLoading: boolean = false;
  rolesList!: any;
//role are the various description like salary,neft etc
  constructor(
    private bankStatmentService: BankStatementService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.bulkUploadFile = new FormControl(null, [Validators.required]);
    this.filterForm = this.formBuilder.group({
      start_date: [''],
      end_date: [''],
      role: [''],
    });
    this.getUsersList();
    this.getRolesList();
  }

  getRolesList() {
    this.isRolesLoading = true;
    this.isRolesError = false;
    this.noRoles = false;

    this.bankStatmentService.getDescriptionList().subscribe(
      (data: any) => {
        if (data.status === '00') {
          this.rolesList = data.response;
          this.isRolesError = false;
          if (this.rolesList.length < 1) {
            this.noRoles = true;
          } else {
            this.noRoles = false;
          }
        } else {
          this.toastrService.error(
            data.msg || 'Error while getting roles list',
            'Error'
          );
          this.isRolesError = true;
        }
        this.isRolesLoading = false;
      },
      (err) => {
        this.isRolesLoading = false;
        this.noRoles = false;
        this.isRolesError = true;
        this.toastrService.error(
          err.message ||
            err.msg ||
            'Unable to get roles list please try again later',
          'Error'
        );
      }
    );
  }

  searchValueChange(e: any) {
    if (e.length == 0) {
      this.getUsersList();
    }
    this.query = this.query.trim();
  }
  search() {
    if (this.query) {
      this.getUsersList(1, this.query);
    } else {
      this.getUsersList();
    }
  }

  getUsersList(page: number = 1, query: string = '') {
    this.isLoading = true;
    this.isError = false;
    this.noData = false;
    this.currentPage = page;
    this.pagescroll = page;
    this.sortOrder = NaN;
    this.bankStatmentService.getUsersList(page, query).subscribe(
      (data: any) => {
        if (data.status === '00') {
          this.isError = false;
          console.log('line 89 --');
          console.log(data);
          console.log(data.response);
          this.usersList = data.response;
          this.pages = data.count;
          console.log(this.usersList);
          if (this.usersList.length < 1) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } else {
          this.toastrService.error(
            data.msg || 'Error while getting users list',
            'Error'
          );
          this.isError = true;
        }

        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.noData = false;
        this.isError = true;
        this.toastrService.error(
          err.message || err.msg || err || 'Errorr while getting users list',
          'Error'
        );
      }
    );
  }

  nextPage() {
    if (this.usersList && this.pagescroll < this.pages) {
      this.pagescroll += 1;
      this.pageintation(this.pagescroll);
    }
  }
  previousPage() {
    if (this.pagescroll > 1) {
      this.pagescroll -= 1;
      this.pageintation(this.pagescroll);
    }
  }

  pageintation(page: number) {
    if (this.query) {
      this.getUsersList(page, this.query);
    } else if (this.haveFilter()) {
      this.filterData(page);
    } else {
      this.getUsersList(page);
    }
    this.currentPage = page;
  }

  filterData(page = 1) {
    if (this.haveFilter()) {
      this.currentPage = page;
      this.pagescroll = page;
      delete this.filterForm.value.action;
      this.bankStatmentService
        .getFilterData(this.filterForm.value, page)
        .subscribe(
          (data: any) => {
            if (data.status === '00') {
              this.isError = false;
              this.usersList = data.response;
              this.pages = data.count;
              if (this.usersList.length < 1) {
                this.noData = true;
              } else {
                this.noData = false;
              }
            } else {
              this.toastrService.error(
                data.msg || 'Error while filtering data',
                'Error'
              );
            }
          },
          (err) => {
            this.isError = true;
            this.toastrService.error(
              err || 'Error while filtering data',
              'Error'
            );
          }
        );
    }
  }
  haveFilter(): boolean {
    let filters = this.filterForm.value;
    let keys = Object.keys(filters);

    for (var key of keys) {
      if (
        filters[key] != '' &&
        filters[key] != null &&
        filters[key] != undefined
      ) {
        return true;
      }
    }

    return false;
  }

  clearFilters() {
    this.filterForm.patchValue({
      start_date: '',
      end_date: '',
      role: '',
    });
    this.getUsersList();
  }

  bulkUploadFileChange(event: any) {
    let file_name = event.target.value;
    let file_type = file_name.split('.').pop();
    console.log(file_type);
    if (file_type != 'csv') {
      this.bulkUploadFile.setErrors({ filetype: true });
    } else {
      if (event?.target?.files[0]?.size > 1048576) {
        this.bulkUploadFile.setErrors({ size: true });
      }
      this.bulkUploadFile.patchValue(event.target.files[0]);
    }
  }

  downloadTemplate() {
    const UserData = [
      {
        Date: '',
        Description: '',
        Debit: '',
        Credit: '',
        Balance: '',
      },
    ];

    const csvContent = Papa.unparse(UserData, { quotes: false });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'BankStatment.csv');
  }
  resetBulkUpload() {
    this.bulkUploadFile.reset();
    this.bulkUploadError = false;
  }
  submitBulkUpload() {
    let formData = new FormData();
    if (!this.bulkUploadFile.valid) {
      return;
    }
    this.submitInProgress = true;
    formData.append('file', this.bulkUploadFile.value);

    // Merge the data object with the form data
    this.bankStatmentService.bulkUpload(formData).subscribe(
      (data: any) => {
        if (data.status == '00') {
          console.log('data-------->');
          console.log(data);
          console.log('line 819 bulk upload');
          console.log(data.data);
          //  console.log(data.data);
          // Hide the loading spinner here
          this.submitInProgress = false;

          // Close the modal
          ($('#bulk_upload') as any).modal('hide');

          // Reset the form or perform any other necessary actions after a delay
          setTimeout(() => {
            this.bulkUploadFile.reset();
          }, 2000); // 2000 milliseconds = 2 seconds

          this.bulkUploadResponse = data.data;
          console.log('this.bulkUploadResponse--');
          console.log(this.bulkUploadResponse);
          ($('#bulk_upload') as any).modal('hide');
          this.toastrService.success(
            data.message || 'Statment added successfully',
            'Success'
          );

          this.bulkUploadFile.reset();
        } else {
          this.bulkUploadError = true;
          this.bulkUploadResponse = data.data;

          this.failure = data.failure;
          this.success = data.success;
          console.log(this.failure);
          this.toastrService.error(
            data.message ||
              "some of the Packages didn't get added due to errors. please check and retry",
            'Error'
          );
        }
        this.ngOnInit();

        this.submitInProgress = false;
      },
      (err: any) => {
        this.toastrService.error(
          err || 'unable to upload file currently. please try after sometime',
          'Error'
        );
        this.submitInProgress = false;
      }
    );
  }
}
