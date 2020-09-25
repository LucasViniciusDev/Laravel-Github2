<!-- Modal Loading -->
<div class="modal" id="modal-loading" data-backdrop="static" data-keyboard="false" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        Aguarde, carregando...
      </div>
    </div>
  </div>
</div>

<!-- Modal Error -->
<div class="modal" id="modal-error" data-backdrop="static" data-keyboard="false" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-body">
            <div class="alert alert-danger modal-error-message">
                ERROR
            </div>
            <div style="text-align: center;">
                <button type="button" class="btn btn-light btn-sm" data-dismiss="modal" aria-label="Close">
                    Fechar
                </button>
            </div>
        </div>
    </div>
  </div>
</div>

<!-- Modal Clone -->
<div class="modal fade" id="modal-clone" tabindex="-1" aria-labelledby="cloneModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="cloneModalLabel">Clone this repository</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row mt-2">
            <div class="col-md-4 col-sm-12">
                <select class="form-control" id="select-clone-type">
                    <option value="https" selected>HTTPS</option>
                    <option value="ssh">SSH</option>
                </select>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12 col-md-12 col-sm-12">
                <input type="text" class="form-control" id="input-url-clone" title="Clique para copiar" readonly>
                <div class="alert alert-success" role="alert" id="alert-copy">
                    <strong>Copiado!</strong>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
